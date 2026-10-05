import Link from "next/link";
import { siteName } from "../content";

export function Wordmark() {
  return (
    <Link className="wordmark" href="/">
      {siteName}
    </Link>
  );
}
