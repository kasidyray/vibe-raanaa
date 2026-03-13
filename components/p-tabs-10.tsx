import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Particle() {
  return (
    <Tabs defaultValue="tab-1">
      <TabsList>
        <TabsTrigger value="tab-1">
          All
          <Badge
            className="not-in-data-active:text-muted-foreground"
            variant="outline"
          >
            128
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="tab-2">
          Pending
          <Badge
            className="not-in-data-active:text-muted-foreground"
            variant="outline"
          >
            8
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="tab-3">
          Completed
          <Badge
            className="not-in-data-active:text-muted-foreground"
            variant="outline"
          >
            120
          </Badge>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1">
        <p className="p-4 text-center text-muted-foreground text-xs">
          All items content
        </p>
      </TabsContent>
      <TabsContent value="tab-2">
        <p className="p-4 text-center text-muted-foreground text-xs">
          Pending items content
        </p>
      </TabsContent>
      <TabsContent value="tab-3">
        <p className="p-4 text-center text-muted-foreground text-xs">
          Completed items content
        </p>
      </TabsContent>
    </Tabs>
  );
}
