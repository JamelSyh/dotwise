import React from "react";
import Label from "components/Label/Label";
import Input from "components/Input/Input";
import { useAppSelector } from "app/hooks";
import { selectAuthState } from "app/auth/auth";

const role: any = {
  "U": "User",
  "B": "Blind User",
  "BA": "Blind Assistant",
  "D": "Developer",
  "A": "Admin",
}


const DashboardSubcription = () => {
  const auth = useAppSelector(selectAuthState);
  const profile = auth.profile;

  const dev_data = [
    { name: "Role", content: "Developer" },
    { name: "Package & billing details", content: " $0.00" },
    { name: "Remaining api Calls", content: "Unbounded" },
    { name: "Expire date", content: "Unbounded" },
    { name: "Api Token", content: "" },
    { name: "Url", content: "" },
  ];
  const normal_data = [
    { name: "Role", content: role[profile.role] },
    { name: "Package & billing details", content: " $0.00" },
    { name: "Expire date", content: "Unbounded" },
  ];

  return (
    <div className="bg-white dark:bg-neutral-900 dark:border dark:border-neutral-800 shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-neutral-900 dark:text-neutral-200">
          Package Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-neutral-500 dark:text-neutral-400">
          You are in <strong>{role[profile.role]}</strong> Mode.
        </p>
      </div>
      <div className="border-t border-neutral-200 dark:border-neutral-900">
        <dl>
          {profile.role != "D" ?
            (
              normal_data.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`${index % 2 === 0
                      ? "bg-neutral-50 dark:bg-neutral-800"
                      : "bg-white dark:bg-neutral-900"
                      } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                  >
                    <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-300">
                      {item.name}
                    </dt>
                    <dd className="mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2">
                      {item.content}
                    </dd>
                  </div>
                );
              })
            )
            :
            (
              dev_data.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`${index % 2 === 0
                      ? "bg-neutral-50 dark:bg-neutral-800"
                      : "bg-white dark:bg-neutral-900"
                      } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                  >
                    <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-300">
                      {item.name}
                    </dt>
                    <dd className="mt-1 text-sm text-neutral-900 dark:text-neutral-200 font-medium sm:mt-0 sm:col-span-2">
                      {item.name == "Api Token" ? (
                        <Input key={index} type="password" name="title" className="mt-1" value={profile.api_key} readOnly />
                      ) : item.name == "Url" ? <><a href={"https://api.dotwise.online"} className="cursor-pointer">api.dotwise.online</a> /  check the <a href={"https://docs.dotwise.online"} className="cursor-pointer text-blue-500"><strong>docs</strong></a></> : item.content}
                    </dd>
                  </div>
                );
              })
            )
          }
        </dl>
      </div>
    </div>
  );
};

export default DashboardSubcription;
