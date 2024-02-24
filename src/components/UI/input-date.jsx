import React, { useState } from 'react'
import { format } from "date-fns"
import { formatDateMonth } from 'utils/date'
import { cn } from "lib/utils"

import { CalendarIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "components/UI/popover"
import { Calendar } from "components/UI/calendar"
import { Button } from 'components/UI/button'

export default function InputDate({placeholder, valueDate, setValueDate}) {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[225px] pl-3 text-left font-normal",
            !valueDate && "text-muted-foreground"
          )}
        >
          {valueDate ? (
            formatDateMonth(valueDate)
          ) : (
            <span>{placeholder}</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={valueDate}
          onSelect={setValueDate}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
