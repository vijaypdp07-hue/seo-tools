import { ToolWrapper } from "../../components/shared/ToolWrapper";
import { AITool } from "../../components/tools/AITool";

interface GenericAIToolPageProps {
  title: string;
  description: string;
  slug: string;
  categoryName: string;
  categoryPath: string;
  promptTemplate: string;
  systemInstruction?: string;
  inputLabel?: string;
  inputPlaceholder?: string;
  actionButtonText?: string;
  hideInput?: boolean;
}

export function GenericAIToolPage({
  title,
  description,
  slug,
  categoryName,
  categoryPath,
  promptTemplate,
  systemInstruction,
  inputLabel = "Input Text",
  inputPlaceholder = "Paste or type your text here...",
  actionButtonText = "Process Text",
  hideInput = false
}: GenericAIToolPageProps) {
  return (
    <ToolWrapper
      title={title}
      description={description}
      categoryName={categoryName}
      categoryPath={categoryPath}
      badges={["AI Powered", "Free"]}
    >
      <div className="mt-8 relative z-0">
        <AITool
          promptTemplate={promptTemplate}
          systemInstruction={systemInstruction}
          inputLabel={inputLabel}
          inputPlaceholder={inputPlaceholder}
          actionButtonText={actionButtonText}
          hideInput={hideInput}
          slug={slug}
          category={categoryName}
          toolPath={`${categoryPath}/${slug}`}
        />
      </div>
    </ToolWrapper>
  );
}
