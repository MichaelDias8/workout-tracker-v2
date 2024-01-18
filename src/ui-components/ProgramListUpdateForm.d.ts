/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ProgramListUpdateFormInputValues = {
    programOrder?: string[];
};
export declare type ProgramListUpdateFormValidationValues = {
    programOrder?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProgramListUpdateFormOverridesProps = {
    ProgramListUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    programOrder?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProgramListUpdateFormProps = React.PropsWithChildren<{
    overrides?: ProgramListUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    programList?: any;
    onSubmit?: (fields: ProgramListUpdateFormInputValues) => ProgramListUpdateFormInputValues;
    onSuccess?: (fields: ProgramListUpdateFormInputValues) => void;
    onError?: (fields: ProgramListUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProgramListUpdateFormInputValues) => ProgramListUpdateFormInputValues;
    onValidate?: ProgramListUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ProgramListUpdateForm(props: ProgramListUpdateFormProps): React.ReactElement;
