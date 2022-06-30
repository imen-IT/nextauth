import { Fragment } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import classNames from "classnames";
import { Menu, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/outline";

export default function AuthLinks() {
  const { data: session, status } = useSession();

  const loading = status === "loading";

  if (typeof window !== "undefined" && loading) return null;

  return (
    <Fragment>
      {session ? (
        <ul>
          <Menu as="div" className="ml-3 relative">
            <div>
              <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="sr-only">Open user menu</span>
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100 p-1.5">
                  <UserIcon className="h-full w-full text-gray-300" />
                </span>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-4 py-3">
                  <p className="text-sm leading-5">Signed in as</p>
                  <p className="text-sm leading-5 font-medium text-gray-900 truncate">
                    {session?.user?.email}
                  </p>
                </div>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames("block px-4 py-2 text-sm")}
                    >
                      Your Profile
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      onClick={signOut}
                      className={classNames(
                        "text-left block px-4 py-2 text-sm"
                      )}
                    >
                      Sign out
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </ul>
      ) : (
        <div className="space-x-1.5">
          <button
            onClick={signIn}
            className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-300"
          >
            Sign in
          </button>
          <Link href="/signup">
            <a className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500">
              Sign up
            </a>
          </Link>
        </div>
      )}
    </Fragment>
  );
}
