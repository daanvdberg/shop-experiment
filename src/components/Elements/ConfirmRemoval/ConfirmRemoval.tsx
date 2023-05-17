import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "@components/Elements";
import { CiCircleRemove } from "react-icons/ci";

export interface ConfirmRemovelProps {
  title?: string;
  description?: string;
  onConfirm: () => void;
}

export const ConfirmRemoval = ({
  title = "Are you absolutely sure?",
  description,
  onConfirm,
}: ConfirmRemovelProps) => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <button className="inline-flex items-center p-2 text-2xl text-slate-600 hover:text-red-700">
        <CiCircleRemove />
      </button>
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 z-10 bg-slate-700/20" />
      <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] z-20 max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white p-6 shadow-lg focus:outline-none">
        <AlertDialog.Title className="mb-8 font-header text-xl">
          {title}
        </AlertDialog.Title>
        {description ? (
          <AlertDialog.Description className="-mt-4 mb-8">
            {description}
          </AlertDialog.Description>
        ) : null}
        <div className="flex justify-end gap-[25px]">
          <AlertDialog.Cancel asChild>
            <Button variant="secondary">Cancel</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <Button variant="danger" onClick={() => onConfirm()}>
              Yes, confirm removal
            </Button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);
