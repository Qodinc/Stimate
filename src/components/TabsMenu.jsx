import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const TabsMenu = ({ activeTab, onTabChange, tabs }) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full overflow-x-auto font-comfortaa mt-16">
      <TabsList className="w-max min-w-full flex">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="flex-shrink-0 whitespace-nowrap"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};


export default TabsMenu
