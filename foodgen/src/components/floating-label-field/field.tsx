/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@eliadmin/core/src/components/ui/button";
import { Checkbox } from "@eliadmin/core/src/components/ui/checkbox";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@eliadmin/core/src/components/ui/form";
import { Input } from "@eliadmin/core/src/components/ui/input";
import { Label } from "@eliadmin/core/src/components/ui/label";
import { PhoneInputField } from "@eliadmin/core/src/components/ui/phone-input/phone-input";
import {
  RadioGroup,
  RadioGroupItem,
} from "@eliadmin/core/src/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@eliadmin/core/src/components/ui/select";
import { cn } from "@eliadmin/core/src/utils/style-utils";
import { useEffect, useMemo, useState } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { FiEyeOff, FiEye } from "react-icons/fi";
import type { InputProps } from "react-select";
import { useFormState } from "react-hook-form";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@eliadmin/core/src/components/ui/popover";
import { format, isValid } from "date-fns";
import {
  Calendar,
  localeMapping,
} from "@eliadmin/core/src/components/ui/calendar";
import { useLocaleStore } from "@eliadmin/core/src/stores/locale-store";
import { enUS } from "date-fns/locale";
import { Textarea } from "@eliadmin/core/src/components/ui/textarea";
import { MultiSelect } from "@eliadmin/core/src/components/ui/multi-select";
import { CalendarIcon } from "@radix-ui/react-icons";

type FieldCustomProps<TFormValues extends FieldValues> = {
  control: Control<any>;
  name: FieldPath<TFormValues>;
  placeholder?: string;
  label?: string | React.ReactNode;
  showLabelTag?: boolean;
  labelIcon?: React.ReactNode;
  required?: boolean;
  type?: InputProps["type"] | "textarea" | "checkbox-group";
  options?: { value: string | number; label: string }[];
  isMulti?: boolean;
  description?: string | React.ReactNode;
  isDisabled?: boolean;
  className?: {
    wrapper?: string;
    selectTrigger?: string;
  };
  clearable?: boolean;
  withoutLabel?: boolean;
  menuPlacement?: "top" | "bottom";
};

export function Field<TFormValues>(
  props: FieldCustomProps<TFormValues & FieldValues>,
) {
  const { errors } = useFormState({ control: props.control });
  const [open, setOpen] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordMouseDown = () => setShowPassword(true);
  const handlePasswordMouseUp = () => setShowPassword(false);
  const localeCode = useLocaleStore((s) => s.currentLocale);
  const locale = localeMapping[localeCode] || enUS;

  const content = useMemo(() => {
    const isError = errors[props.name];

    if (props.type === "select") {
      if (!props.options) {
        throw new Error("Select type requires options prop");
      }

      return (
        <FormField
          control={props.control}
          name={props.name}
          render={({ field }) => {
            return (
              <FormItem
                className={cn(
                  "relative min-h-[56px]",
                  props.label &&
                    "flex flex-col items-start justify-start gap-3",
                )}
              >
                {props.showLabelTag && props.label && (
                  <Label className="text-foreground/50 text-base font-semibold sm:text-lg">
                    {props.label}
                  </Label>
                )}
                <FormControl>
                  <div className={cn("relative", props.label && "w-full")}>
                    <Select
                      value={String(field.value)}
                      onValueChange={(val) => {
                        field.onChange(val);
                      }}
                      disabled={props.isDisabled}
                    >
                      <SelectTrigger
                        className={cn(
                          "border-border bg-input min-h-[56px] cursor-pointer rounded-md border !pl-0",
                          props.className?.selectTrigger,
                        )}
                        isClearable={props.clearable && field.value}
                        onClear={() => field.onChange(null)}
                        clearableIconPossition="right"
                      >
                        {!props.withoutLabel && (
                          <FormLabel
                            htmlFor={props.name}
                            className={cn(
                              "text-foreground/50 absolute left-5 top-4 z-[1] cursor-pointer select-none transition-all duration-100",
                              field.value && field.value !== ""
                                ? "!top-[10px] text-xs"
                                : "text-base",
                              isError && "text-destructive",
                            )}
                            isRequired={false}
                          >
                            {!!props.label &&
                              `${props.label}${props.required ? "*" : ""}`}
                          </FormLabel>
                        )}
                        <div
                          className={
                            field.value &&
                            field.value !== "" &&
                            !props.withoutLabel
                              ? "pl-4 pt-[20px]"
                              : "pl-4"
                          }
                        >
                          <SelectValue
                            placeholder={props.placeholder}
                            className="pl-[30px]"
                          />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {props.options?.map?.((o) => (
                          <SelectItem key={o.value} value={String(o.value)}>
                            {o.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </FormControl>

                {props.description && (
                  <p className="text-muted-foreground ml-3 h-5 py-1 text-[12px] text-sm leading-4">
                    {props.description}
                  </p>
                )}
                <FormMessage />
              </FormItem>
            );
          }}
        />
      );
    }

    if (props.type === "multiselect") {
      if (!props.options) {
        throw new Error("MultiSelect type requires options prop");
      }

      return (
        <FormField
          control={props.control}
          name={props.name}
          render={({ field }) => {
            return (
              <FormItem className="relative min-h-[56px]">
                <FormControl>
                  <MultiSelect
                    options={props.options} // Options passed in
                    isMulti={true} // Multi select enabled
                    placeholder={props.placeholder} // Placeholder text
                    value={field.value} // Controlled field value
                    onChange={field.onChange} // Handling changes
                    isDisabled={props.isDisabled} // Disabled state
                    noOptionsMessage={() => "No options available"} // Custom message for no options
                    stylesConfig={{}} // Custom styles if needed (optional)
                    menuPlacement={props.menuPlacement || "bottom"}
                    classNamesConfig={{
                      valueContainer(props) {
                        return cn("pl-4  bg-input");
                      },

                      control(props) {
                        return cn("!min-h-[60px] bg-input");
                      },
                      menu(props) {
                        return cn("!z-[100] !bg-input");
                      },
                      menuList(props) {
                        return cn("!z-[100] !bg-input block");
                      },
                    }} // Custom classNames if needed (optional)
                    variant={"outlined"}
                  />
                </FormControl>
                {props.description && (
                  <p className="text-muted-foreground ml-3 h-5 py-1 text-[12px] text-sm leading-4">
                    {props.description}
                  </p>
                )}
                <FormMessage />
              </FormItem>
            );
          }}
        />
      );
    }

    if (props.type === "radio") {
      if (!props.options) {
        throw new Error("Radio type requires options prop");
      }

      return (
        <FormField
          control={props.control}
          name={props.name}
          render={({ field }) => {
            return (
              <FormItem
                required={props.required}
                className="flex flex-col gap-2 p-[1px]"
              >
                {props.label && (
                  <FormLabel className="cursor-text select-none">
                    {props.label}
                  </FormLabel>
                )}
                <FormControl>
                  <RadioGroup
                    value={String(field.value)}
                    onValueChange={field.onChange}
                    disabled={props.isDisabled}
                    className="flex flex-row gap-4 pl-2"
                  >
                    {props.options?.map?.((o) => (
                      <div key={o.value} className="flex gap-2">
                        <RadioGroupItem
                          id={`radiogroupitem-${o.value}`}
                          value={String(o.value)}
                        />
                        <Label
                          className="flex items-center"
                          htmlFor={`radiogroupitem-${o.value}`}
                        >
                          <p className="text-foreground text-sm font-semibold">
                            {o.label}
                          </p>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                {props.description && (
                  <p className="text-muted-foreground ml-3 h-5 py-1 text-[12px] text-sm leading-4">
                    {props.description}
                  </p>
                )}
                <FormMessage />
              </FormItem>
            );
          }}
        />
      );
    }

    if (props.type === "checkbox") {
      return (
        <FormField
          control={props.control}
          name={props.name}
          render={({ field }) => (
            <FormItem required={props.required}>
              <FormControl>
                <div className="flex w-full flex-row items-center gap-2">
                  <Checkbox
                    {...field}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={props.isDisabled}
                    aria-disabled={props.isDisabled}
                    className="data-[state=checked]:bg-secondary rounded-[4px]"
                  />
                  {props.label && <FormLabel>{props.label}</FormLabel>}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }

    if (props.type === "tel") {
      return (
        <FormField
          control={props.control}
          name={props.name}
          render={({ field }) => (
            <FormItem
              required={props.required}
              className={cn(
                "focus-within:border-primary min-h-[56px] rounded-md border",
                props.className?.wrapper,
              )}
            >
              <FormControl className="min-h-[56px]">
                <PhoneInputField
                  placeholder={props.placeholder}
                  type={props.type}
                  {...field}
                  disabled={props.isDisabled}
                  aria-disabled={props.isDisabled}
                  className={cn(
                    "bg-input rounded-md",
                    "ea-phone-input__wrapper",
                  )}
                  inputClassName={cn("bg-input")}
                  inputStyle={{
                    height: "54px",
                    width: "100%",
                    borderEndEndRadius: "40px",
                    borderStartEndRadius: "40px",
                    border: "none",
                    fontSize: "16px",
                    lineHeight: "20px",
                  }}
                  countrySelectorStyleProps={{
                    buttonClassName: "bg-input",
                    buttonStyle: {
                      height: "54px",
                      width: "80px",
                      borderStartStartRadius: "40px",
                      borderEndStartRadius: "40px",
                      paddingLeft: "12px",
                      border: "none",
                    },
                  }}
                />
              </FormControl>
              {props.description && (
                <p className="text-muted-foreground ml-3 h-5 py-1 text-[12px] text-sm leading-4">
                  {props.description}
                </p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }

    if (props.type === "checkbox-group") {
      if (!props.options) {
        throw new Error("CheckboxGroup type requires options prop");
      }

      return (
        <div className="flex flex-col gap-4">
          <FormField
            control={props.control}
            name={props.name}
            render={({ field }) => (
              <FormItem
                required={props.required}
                className="flex flex-col gap-4"
              >
                {props.options?.map?.((o) => (
                  <div key={o.value} className="flex items-center gap-2">
                    <Checkbox
                      id={o.value.toString()}
                      value={o.value}
                      checked={field.value.includes(o.value)}
                      onCheckedChange={field.onChange}
                      disabled={props.isDisabled}
                      className="data-[state=checked]:bg-secondary rounded-[4px]"
                    />
                    <Label
                      className="cursor-text select-none"
                      htmlFor={o.value.toString()}
                    >
                      {o.label}
                    </Label>
                  </div>
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      );
    }

    // Add the new 'date' type handling here
    if (props.type === "date") {
      return (
        <FormField
          control={props.control}
          name={props.name}
          render={({ field, fieldState }) => {
            const isError = fieldState.error;

            return (
              <FormItem className="relative min-h-[56px]">
                <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        type="button"
                        className={cn(
                          "border-border bg-input hover:bg-primary/40 h-[56px] w-full justify-start rounded-md border p-3 pl-10 text-left text-base font-normal !normal-case",
                          !field.value && "text-foreground/50",
                          isError && "border-destructive text-destructive",
                        )}
                        disabled={props.isDisabled}
                      >
                        <CalendarIcon className="text-primary absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2" />
                        {field.value && !isNaN(new Date(field.value))
                          ? format(new Date(field.value), "PPP", { locale })
                          : props.placeholder || "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      side="bottom"
                      align="start"
                      className="w-auto p-0"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setOpen(false); // Close the popover when a date is selected
                        }}
                        disabled={props.isDisabled}
                        initialFocus
                        fromYear={1920}
                        toYear={new Date().getFullYear() + 5}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                {props.description && (
                  <p className="text-muted-foreground ml-3 h-5 py-1 text-[12px] text-sm leading-4">
                    {props.description}
                  </p>
                )}
                <FormMessage />
              </FormItem>
            );
          }}
        />
      );
    }

    if (props.type === "textarea") {
      return (
        <FormField
          control={props.control}
          name={props.name}
          render={({ field }) => (
            <FormItem
              required={props.required}
              className={cn(
                "min-h-[56px]",
                props.label && "flex flex-col items-start justify-start gap-3",
                props.className?.wrapper,
              )}
            >
              {props.label && (
                <Label className="text-foreground text-base font-bold sm:text-lg">
                  {props.label}
                </Label>
              )}
              <FormControl className="min-h-[56px]">
                <Textarea
                  id={props.name}
                  placeholder={props.placeholder}
                  {...field}
                  disabled={props.isDisabled}
                  aria-disabled={props.isDisabled}
                  rows={8}
                  className={cn(
                    "border-border bg-input w-full rounded-lg border p-5 text-base",
                    isError && "border-destructive text-destructive",
                    props.className?.wrapper,
                  )}
                />
              </FormControl>
              {props.description && (
                <p className="text-muted-foreground ml-3 h-5 py-1 text-[12px] text-sm leading-4">
                  {props.description}
                </p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      );
    }

    // Default case
    return (
      <FormField
        control={props.control}
        name={props.name}
        render={({ field }) => (
          <FormItem className="relative min-h-[56px]">
            <FormControl>
              <div className="relative">
                {/* Label with floating effect */}
                <FormLabel
                  htmlFor={props.name}
                  className={cn(
                    "text-foreground/50 absolute left-5 top-4 z-[1] flex cursor-text select-none items-center gap-2 font-normal transition-all duration-100",
                    field.value && field.value != ""
                      ? "!top-[10px] text-xs"
                      : "text-base",
                    isError && "text-destructive",
                  )}
                  // Always set to false, we add start manually because of color
                  isRequired={false}
                >
                  {props.labelIcon && (
                    <div
                      className={cn(
                        "text-primary",
                        field.value && field.value != ""
                          ? "text-sm"
                          : "text-lg",
                      )}
                    >
                      {props.labelIcon}
                    </div>
                  )}
                  {`${props.label}${props.required ? "*" : ""}`}
                </FormLabel>

                <Input
                  id={props.name}
                  //   placeholder={isFocused ? props.placeholder : ''}
                  type={props.type}
                  {...(showPassword && { type: "text" })}
                  {...field}
                  disabled={props.isDisabled}
                  aria-disabled={props.isDisabled}
                  placeholder={props.placeholder}
                  className={{
                    main: `focus border-border bg-input block w-full rounded-md border p-3 pl-[26px] text-base transition-all hover:outline-0 hover:ring-0 focus:ring-0 ${field.value && field.value != "" ? "pt-[30px]" : ""} ${isError && "border-destructive text-destructive"} `,
                    wrapper: "bg-input h-[56px]",
                  }}
                  after={
                    props.type === "password" && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className={isError && "text-destructive"}
                        onMouseDown={handlePasswordMouseDown}
                        onMouseUp={handlePasswordMouseUp}
                        onMouseLeave={handlePasswordMouseUp} // In case the cursor leaves the button area while pressing
                        onTouchStart={handlePasswordMouseDown}
                        onTouchEnd={handlePasswordMouseUp}
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </Button>
                    )
                  }
                />
              </div>
            </FormControl>

            {props.description && (
              <p className="text-muted-foreground ml-3 h-5 py-1 text-[12px] text-sm leading-4">
                {props.description}
              </p>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }, [
    props.control,
    props.isDisabled,
    props.required,
    props.label,
    props.name,
    props.options,
    props.placeholder,
    props.type,
    props.description,
    props.labelIcon,
    props.className,
    errors[props.name],
    showPassword,
    open,
  ]);

  return (
    <div className={cn(props.className?.wrapper, "rounded-[28px]")}>
      {content}
    </div>
  );
}

type InputCustomProps<TFormValues> = {
  control: Control<any>;
  name: FieldPath<TFormValues extends Record<string, any> ? TFormValues : any>;
  placeholder?: string;
  after?: React.ReactNode;
  className?: string;
};

export function InputCustom<TFormValues>({
  control,
  name,
  placeholder,
  after,
  className,
}: InputCustomProps<TFormValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cn("relative min-h-[56px]", className)}>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                placeholder={placeholder}
                className={{
                  main: `focus border-border bg-input block w-full rounded-md border p-3 pl-[26px] text-base transition-all hover:outline-0 hover:ring-0 focus:ring-0 ${fieldState.error ? "border-destructive text-destructive" : ""} `,
                  wrapper: "bg-input h-[56px]",
                }}
                after={after}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
