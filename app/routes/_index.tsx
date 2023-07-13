import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "~/components/links";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <Link
            target="_blank"
            to="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </Link>
        </li>
        <li>
          <Link
            target="_blank"
            to="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </Link>
        </li>
        <li>
          <Link target="_blank" to="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </Link>
        </li>
      </ul>
    </div>
  );
}
