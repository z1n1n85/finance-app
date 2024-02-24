import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "lib/utils"
import { Button } from "components/UI/button"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandEmpty
} from "components/UI/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "components/UI/popover"

export function Select({
  options,
  placeholder,
  onChange,
  startValue,
  className,
  width,
  isSearch = false,
  searchPlaceholder,
  searchEmpty
}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(startValue || '')

  return (
    <Popover open={open} onOpenChange={setOpen} className={className}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[225px] justify-between", className, width)}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-[225px] p-0", width)}>
        <Command>
          {(isSearch)
          ? <>
            <CommandInput placeholder={searchPlaceholder} />  
            <CommandEmpty>{searchEmpty}</CommandEmpty>
          </>
          : ''}
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                  let newValue = currentValue === value ? "" : currentValue;
                  setValue(newValue);
                  setOpen(false);
                  onChange(newValue);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}