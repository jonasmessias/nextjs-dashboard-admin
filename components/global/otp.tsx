import { chunk } from "lodash"
import { ControllerRenderProps, FieldValues } from "react-hook-form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "../ui/input-otp"

export interface OTPProps<T extends FieldValues> {
  maxLength?: number
  hasSeparator?: boolean
  groupLength?: number
  field?: ControllerRenderProps<T>
}

export const OTP = <T extends FieldValues>({
  maxLength = 6,
  groupLength = 3,
  hasSeparator,
  field,
}: OTPProps<T>) => {
  if (hasSeparator) {
    const arr = Array.from({ length: maxLength }, (_, index) => index)
    const dataChuncked = chunk(arr, groupLength)
    return (
      <InputOTP maxLength={maxLength} {...field}>
        {dataChuncked.map((arr, index) => {
          return (
            <>
              <InputOTPGroup key={index + 1}>
                {arr.map((value) => {
                  return <InputOTPSlot key={value + index} index={value} />
                })}
              </InputOTPGroup>
              {dataChuncked.length !== index + 1 && <InputOTPSeparator />}
            </>
          )
        })}
      </InputOTP>
    )
  }

  return (
    <InputOTP maxLength={maxLength} {...field}>
      <InputOTPGroup>
        {Array.from({ length: maxLength }, (_, index) => {
          return <InputOTPSlot key={index} index={index} />
        })}
      </InputOTPGroup>
    </InputOTP>
  )
} 