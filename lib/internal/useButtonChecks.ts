import type React from 'react';

import { applyStyle } from '../internal/applyStyle';
import { ERROR_STYLE } from '../internal/error.style';
import { useChecks } from '../internal/useChecks';

export const useButtonChecks = __DEV__
  ? (
      props: Record<string, any>,
      children?: React.ReactNode,
      shouldPerformContrastCheck: boolean = true,
    ) => {
      const {
        noUndefinedProperty,
        contrastChecker,
        onLayout,
        accessibilityLabelChecker,
        minimumSizeFailed,
        // @ts-ignore
      } = useChecks();

      // @ts-ignore
      let style = props.style || {};

      // @ts-ignore
      const debugStyle = {
        ...noUndefinedProperty({
          properties: props,
          property: 'accessibilityRole',
          rule: 'NO_ACCESSIBILITY_ROLE',
        }),
        ...noUndefinedProperty({
          properties: props,
          property: 'accessibilityLabel',
          rule: 'NO_ACCESSIBILITY_LABEL',
        }),
        ...accessibilityLabelChecker({
          accessibilityLabel: props.accessibilityLabel,
        }),
        ...(minimumSizeFailed ? ERROR_STYLE : {}),
      };

      const contrastCheckerCallback = shouldPerformContrastCheck
        ? contrastChecker
        : undefined;

      const theStyle = applyStyle?.({
        style,
        debugStyle,
        children,
        contrastCheckerCallback,
      });

      return {
        onLayout,
        debugStyle: theStyle,
      };
    }
  : null;
