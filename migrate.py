import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Avoid processing if not tsx/ts
    if not (filepath.endswith('.tsx') or filepath.endswith('.ts')):
        return

    original = content

    # Add "use client" if it's a component or page
    if 'use client' not in content and ('from "react"' in content or 'lucide-react' in content or 'Link' in content or 'useReadProgress' in content or 'useState' in content or 'useEffect' in content):
        content = '"use client";\n\n' + content

    # Navigation replacements
    if 'react-router-dom' in content:
        # Link
        if 'Link' in content:
            content = re.sub(r'import\s+\{[^\}]*Link[^\}]*\}\s+from\s+["\']react-router-dom["\'];?', 'import Link from "next/link";\nimport { useParams, usePathname, useRouter } from "next/navigation";', content)
        else:
            content = re.sub(r'import\s+\{[^\}]*\}\s+from\s+["\']react-router-dom["\'];?', 'import { useParams, usePathname, useRouter } from "next/navigation";', content)
            
        content = content.replace('<Link to=', '<Link href=')
        content = content.replace('useNavigate()', 'useRouter()')
        content = content.replace('useLocation()', 'usePathname()')
        # MeetingPage has useParams() -> const { id } = useParams()
        # Next.js App Router useParams() returns { id: string } or string[]

    content = content.replace('import { Layout }', 'import { Layout }')

    # Sidebar replacements specifically
    if 'AppSidebar' in filepath:
        content = content.replace('const location = usePathname();', 'const pathname = usePathname();')
        content = content.replace('location.pathname', 'pathname')
        content = re.sub(r'import\s+\{\s*useLocation\s*\}\s*from\s+["\']react-router-dom["\'];?', 'import { usePathname } from "next/navigation";', content)

    # NavLink replacements specifically
    if 'NavLink' in filepath:
        content = content.replace('import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";', 'import Link from "next/link";\nimport { usePathname } from "next/navigation";')
        content = re.sub(r'export const NavLink.*?=> \{', 'export const NavLink = ({ to, children, className, onClick, ...props }: any) => {\n  const pathname = usePathname();', content, flags=re.DOTALL)
        content = content.replace('<RouterNavLink', '<Link').replace('</RouterNavLink>', '</Link>')
        content = content.replace('to={to}', 'href={to}')

    if original != content:
        with open(filepath, 'w') as f:
            f.write(content)

dirs_to_walk = [
    'src/app',
    'src/components',
    'src/hooks',
    'src/lib'
]

for d in dirs_to_walk:
    for root, _, files in os.walk(d):
        for file in files:
            process_file(os.path.join(root, file))

print("Migration completed.")
