const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'docu-dash-discover/src/pages');
const appDir = path.join(__dirname, 'src/app');

// Ensure directories
['bookmarks', 'intro', 'meeting', 'meeting/[id]', 'notes', 'search'].forEach(d => {
  fs.mkdirSync(path.join(appDir, d), { recursive: true });
});

const pagesMap = {
  'Index.tsx': 'page.tsx',
  'BookmarksPage.tsx': 'bookmarks/page.tsx',
  'IntroPage.tsx': 'intro/page.tsx',
  'MeetingPage.tsx': 'meeting/[id]/page.tsx',
  'NotesPage.tsx': 'notes/page.tsx',
  'SearchPage.tsx': 'search/page.tsx'
};

for (const [srcFile, destFile] of Object.entries(pagesMap)) {
  let content = fs.readFileSync(path.join(srcDir, srcFile), 'utf8');
  
  // Replace react-router-dom imports
  content = content.replace(/import\s+\{([^}]+)\}\s+from\s+"react-router-dom";/g, (match, imports) => {
    let nextImports = [];
    let navImports = [];
    
    if (imports.includes('Link')) nextImports.push('Link');
    if (imports.includes('useParams')) navImports.push('useParams');
    if (imports.includes('useLocation')) navImports.push('usePathname');
    if (imports.includes('useNavigate')) navImports.push('useRouter');

    let lines = [];
    if (nextImports.length > 0) lines.push(`import ${nextImports.join(', ')} from "next/link";`);
    if (navImports.length > 0) lines.push(`import { ${navImports.join(', ')} } from "next/navigation";`);
    
    return lines.join('\n');
  });

  // Next.js App Router hooks (like params, etc) require "use client" if they are used interactively or if component imports client stuff.
  // The Shadcn components use state, and all pages here use custom hooks like useReadProgress which use useState/useEffect. So all pages are "use client".
  content = `"use client";\n\n` + content;

  // React Router "to=" in Links -> Next.js "href="
  content = content.replace(/<Link([^>]*)to=/g, '<Link$1href=');

  fs.writeFileSync(path.join(appDir, destFile), content);
}

// Update AppSidebar
let sidebar = fs.readFileSync(path.join(__dirname, 'src/components/AppSidebar.tsx'), 'utf8');
sidebar = sidebar.replace(/import\s*\{\s*useLocation\s*\}\s*from\s*"react-router-dom";/, 'import { usePathname } from "next/navigation";');
sidebar = sidebar.replace(/useLocation\(\)/g, 'usePathname()');
sidebar = sidebar.replace(/location\.pathname/g, 'pathname');
sidebar = `"use client";\n` + sidebar;
fs.writeFileSync(path.join(__dirname, 'src/components/AppSidebar.tsx'), sidebar);

// Update NavLink
let navLink = fs.readFileSync(path.join(__dirname, 'src/components/NavLink.tsx'), 'utf8');
navLink = navLink.replace(/import \{ NavLink as RouterNavLink, NavLinkProps \} from "react-router-dom";/, 'import Link from "next/link";\nimport { usePathname } from "next/navigation";');
navLink = navLink.replace(/export const NavLink = \(\{\s*to,\s*children,\s*className,\s*onClick,\s*...props\s*\}\: NavLinkProps\) => \{/, 
  'export const NavLink = ({ to, children, className, onClick, ...props }: any) => {\n  const pathname = usePathname();');
navLink = navLink.replace(/to=/g, 'href=');
navLink = navLink.replace(/<RouterNavLink/g, '<Link');
navLink = navLink.replace(/<\/RouterNavLink>/g, '</Link>');
navLink = `"use client";\n` + navLink;
fs.writeFileSync(path.join(__dirname, 'src/components/NavLink.tsx'), navLink);

console.log("Migration done");
