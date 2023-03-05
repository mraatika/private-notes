const devOnlyLoggers = ['debug', 'log'];

const handler = {
  get(target, prop, receiver) {
    if (
      !devOnlyLoggers.includes(prop) ||
      process.env.NODE_ENV === 'development'
    ) {
      // @ts-ignore
      return Reflect.get(...arguments);
    } else {
      return () => {};
    }
  },
};

export default new Proxy(console, handler);
