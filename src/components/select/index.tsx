import {
  Root,
  Trigger,
  Icon,
  Portal,
  Content,
  Label,
  Value,
  Viewport,
  Group,
  Item,
  ItemText,
  ItemIndicator,
} from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";

type SelectValue = { value: string; label: string };

interface IProps {
  label?: string;
  placeholder?: string;
  values: SelectValue[];
  onChange: (value: string) => void;
  emptyValue?: string;
}

const Select = ({
  label,
  placeholder = "Select...",
  values,
  onChange,
  emptyValue,
}: IProps) => {
  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <Root onValueChange={handleChange} defaultValue="">
      <Trigger
        className="inline-flex h-8 items-center justify-center gap-2 rounded border border-slate-200 bg-slate-50 px-3 text-sm leading-none text-slate-700 outline-none hover:bg-slate-700 hover:text-white focus:bg-slate-700 focus:text-white data-[placeholder]:text-slate-700 hover:data-[placeholder]:text-white"
        aria-label={label}
      >
        <Value placeholder={placeholder} />
        <Icon>
          <ChevronDownIcon />
        </Icon>
      </Trigger>
      <Portal className="z-50">
        <Content className="overflow-hidden rounded bg-white shadow-lg shadow-slate-700/10">
          <Viewport className="py-2">
            <Group>
              <Label className="border-b px-2 pb-2 text-xs text-slate-500">
                {label}
              </Label>
              {emptyValue ? (
                <Item
                  key="empty-value"
                  className="relative flex select-none items-center py-2 pl-6 pr-3 text-sm font-normal text-slate-700 data-[highlighted]:bg-slate-100 data-[highlighted]:text-slate-700 data-[highlighted]:outline-none"
                  value=""
                >
                  <ItemText>{emptyValue}</ItemText>
                  <ItemIndicator className="absolute left-0 inline-flex w-6 items-center justify-center">
                    <CheckIcon />
                  </ItemIndicator>
                </Item>
              ) : null}
              {values.map((i) => (
                <Item
                  key={i.value}
                  className="relative flex select-none items-center py-2 pl-6 pr-3 text-sm font-normal text-slate-700 data-[highlighted]:bg-slate-100 data-[highlighted]:text-slate-700 data-[highlighted]:outline-none"
                  value={i.value}
                >
                  <ItemText>{i.label}</ItemText>
                  <ItemIndicator className="absolute left-0 inline-flex w-6 items-center justify-center">
                    <CheckIcon />
                  </ItemIndicator>
                </Item>
              ))}
            </Group>
          </Viewport>
        </Content>
      </Portal>
    </Root>
  );
};

export default Select;
