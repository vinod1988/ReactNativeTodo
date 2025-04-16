import Toast from 'react-native-toast-message';

const showSuccessToast = (title: string, message: string) => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: message,
    position: 'top',
  });
};

const showErrorToast = (title: string, message: string) => {
  Toast.show({
    type: 'error',
    text1: title,
    text2: message,
    position: 'top',
  });
};

const showInfoToast = (title: string, message: string) => {
  Toast.show({
    type: 'info',
    text1: title,
    text2: message,
    position: 'top',
  });
};

export default {
  success: showSuccessToast,
  error: showErrorToast,
  info: showInfoToast,
};
