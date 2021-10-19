export const validaEntry = (event) => {
    const reg = /^[A-Za-z0-9\s]+$/;
    if (!reg.test(event.key)) {
      event.preventDefault();
    }
  };