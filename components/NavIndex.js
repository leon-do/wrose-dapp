import Link from "next/link";

export default function NavIndex() {
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
                <Link href="/docs">
                  <a className="inline-flex items-center border-b-2 hover:border-b-sky-500 px-1 pt-1 text-base font-medium">Docs</a>
                </Link>
                <Link href="/github">
                  <a className="inline-flex items-center border-b-2 hover:border-b-sky-500 px-1 pt-1 text-base font-medium">Github</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
