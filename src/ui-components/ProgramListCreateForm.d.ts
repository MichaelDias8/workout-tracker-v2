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
export declare type ProgramListCreateFormInputValues = {
    programOrder?: string[];
};
export declare type ProgramListCreateFormValidationValues = {
    programOrder?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProgramListCreateFormOverridesProps = {
    ProgramListCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    programOrder?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProgramListCreateFormProps = React.PropsWithChildren<{
    overrides?: ProgramListCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ProgramListCreateFormInputValues) => ProgramListCreateFormInputValues;
    onSuccess?: (fields: ProgramListCreateFormInputValues) => void;
    onError?: (fields: ProgramListCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProgramListCreateFormInputValues) => ProgramListCreateFormInputValues;
    onValidate?: ProgramListCreateFormValidationValues;
} & React.CSSProperties>;
export default function ProgramListCreateForm(props: ProgramListCreateFormProps): React.ReactElement;
