import { Tabs as Root, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import type { ReactNode } from "react";

interface DataType {
  id: number;
  value: string;
  content: ReactNode;
  triggerText: string;
}

interface TabsProps {
  defaultValue: string;
  data: DataType[];
  rootClassName?: string;
  tabsListClassName: string;
  tabsTriggerClassName?: string;
  tabsContentClassName?: string;
}

export const Tabs = ({
  defaultValue,
  data,
  rootClassName,
  tabsContentClassName,
  tabsTriggerClassName,
  tabsListClassName,
}: TabsProps) => {
  return (
    <Root defaultValue={defaultValue} className={rootClassName}>
      <TabsList className={tabsListClassName}>
        {data.map((val) => (
          <TabsTrigger
            value={val.value}
            key={val.value}
            className={tabsTriggerClassName}
          >
            {val.triggerText}
          </TabsTrigger>
        ))}
      </TabsList>
      {data.map((val) => (
        <TabsContent
          value={val.value}
          key={val.id}
          className={tabsContentClassName}
        >
          {val.content}
        </TabsContent>
      ))}
    </Root>
  );
};
