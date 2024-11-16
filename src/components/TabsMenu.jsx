import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const TabsMenu = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="overflow-hidden rounded-t-xl">
    <Tabs value={activeTab} onValueChange={onTabChange} className="overflow-x-auto font-comfortaa">
      <TabsList className="flex">
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
    </div>
  );
};


export default TabsMenu
