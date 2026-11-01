import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'CoreAML | See the risk. Follow the money.',description:'Connected financial crime investigations, customer intelligence and accountable reviews. A product of ZeroDaySecurity and Bex Labs. Request a CoreAML demo.',icons:{icon:'/favicon.svg'},openGraph:{title:'CoreAML | Financial Crime Intelligence',description:'A clearer path from an alert to an informed decision.',type:'website'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
