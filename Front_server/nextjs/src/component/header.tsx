import '../app/globals.css';
import Link from "next/link";
const HeaderComponent = () => {
    return (
      <div>
        <ul>
            <li>
                <Link href="/">Home</Link>
                <Link href="/test">메뉴1</Link>
                <Link href="/test2">메뉴2</Link>
            </li>
        </ul>
      </div>
    );
  };
  export default HeaderComponent;