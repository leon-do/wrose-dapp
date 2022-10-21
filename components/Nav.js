import { useEffect, useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [page, setPage] = useState("wrap");

  useEffect(() => {
    setPage(window.location.pathname);
  }, []);

  return (
    <>
      <nav>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <img className="h-8 w-auto lg:block" src="/images/oasis.svg" alt="WROSE" />
              </div>
              <div className="ml-6 flex space-x-8">
                <Link href="/wrap">
                  <a className={`${page === "/wrap" ? "border-indigo-500" : ""} inline-flex items-center border-b-2  px-1 pt-1 text-base font-medium`}>Wrap</a>
                </Link>
                <Link href="/unwrap">
                  <a className={`${page === "/unwrap" ? "border-indigo-500" : ""} inline-flex items-center border-b-2  px-1 pt-1 text-base font-medium`}>Unwrap</a>
                </Link>
                <Link href="/send">
                  <a className={`${page === "/send" ? "border-indigo-500" : ""} inline-flex items-center border-b-2  px-1 pt-1 text-base font-medium`}>Send</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}