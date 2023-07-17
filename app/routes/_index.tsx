import type { V2_MetaFunction } from "@remix-run/node";
import { Switch, Tab } from '@headlessui/react'
import React from "react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Plan It Social" }
  ];
};

export default function Index() {

  const [enabled, setEnabled] = React.useState(false)

  return (
    <div className="m-auto flex flex-col items-center justify-center">
      <h2 className="mt-10">Headless UI toggle:</h2>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${
          enabled ? 'bg-blue-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span className="sr-only">Enable notifications</span>
        <span
          className={`${
            enabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
      <h2 className="mt-10">Tabs:</h2>
      <Tab.Group>
        <Tab.List>
          <Tab className="m-4 text-bold">Tab 1</Tab>
          <Tab className="m-4 text-bold">Tab 2</Tab>
          <Tab className="m-4 text-bold">Tab 3</Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>Content 1</Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
