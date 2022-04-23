interface IEither<S, F> {
  value: S | F;
  hasError: boolean;
}

type Success<S, F> = IEither<S, unknown> & {
  value: S;
  hasError: false;
};

type Failure<S, F> = IEither<unknown, F> & {
  value: F;
  hasError: true;
};

type Either<S, F> = Success<S, unknown> | Failure<unknown, F>;

const success = <T>(value: T): Success<T, unknown> => ({
  value,
  hasError: false,
});

const failure = <T>(value: T): Failure<unknown, T> => ({
  value,
  hasError: true,
});

export { Either, success, failure };
