import { ToolWrapper } from "../../components/shared/ToolWrapper";
import { FabricEditor } from "../../components/tools/FabricEditor";

interface DesignStudioPageProps {
  title: string;
  description: string;
  slug: string;
  categoryName: string;
  categoryPath: string;
  width: number;
  height: number;
}

export function DesignStudioPage({
  title,
  description,
  slug,
  categoryName,
  categoryPath,
  width,
  height
}: DesignStudioPageProps) {
  return (
    <ToolWrapper
      title={title}
      description={description}
      categoryName={categoryName}
      categoryPath={categoryPath}
    >
      <div className="mt-8">
        <FabricEditor 
          width={width} 
          height={height} 
          title={title} 
          slug={slug}
          categoryName={categoryName}
          categoryPath={categoryPath}
        />
      </div>
    </ToolWrapper>
  );
}
