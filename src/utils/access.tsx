// components/AccessibleToast.tsx
import React from 'react';
import {View, Text, StyleSheet, AccessibilityInfo} from 'react-native';

type ToastType = 'success' | 'error' | 'info';

const AccessibleToast = ({
  text1,
  text2,
  type,
}: {
  text1: string;
  text2?: string;
  type: ToastType;
}) => {
  const accessibilityText = `${type}: ${text1}. ${text2}`;

  AccessibilityInfo.announceForAccessibility(accessibilityText);

  return (
    <View
      style={[
        styles.container,
        styles[type], // This now works because type is restricted
      ]}
      accessible={true}
      accessibilityLiveRegion="polite"
      accessibilityRole="alert"
      accessibilityLabel={accessibilityText}>
      <Text style={styles.text1}>{text1}</Text>
      {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
    marginTop: 50,
    marginHorizontal: 10,
  },
  success: {backgroundColor: '#4BB543'},
  error: {backgroundColor: '#FF4C4C'},
  info: {backgroundColor: '#3498db'},
  text1: {fontWeight: 'bold', color: '#fff', fontSize: 16},
  text2: {color: '#fff', fontSize: 14, marginTop: 4},
});

export default AccessibleToast;
