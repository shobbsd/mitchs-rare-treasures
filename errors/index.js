exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({ msg: err.msg });
  } else next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
  const errRef = {
    '42703': {
      status: 400,
      msg: createPsqlMessage(err)
    },
    '23502': {
      status: 400,
      msg: create23502Message(err)
    },
    '22P02': {
      status: 400,
      msg: createPsqlMessage(err)
    }
  };
  const error = errRef[err.code];
  if (error) {
    res.status(error.status).json({ msg: error.msg });
  } else next(err);
};

exports.handle500Errors = (err, req, res, next) => {
  console.log(err);
  res
    .status(500)
    .json({ msg: 'uh oh, something serious has happened. Sorry!' });
};

function createPsqlMessage(err) {
  return err.message.split(' - ')[1];
}

function create23502Message(err) {
  return `${err.column} is missing from insertion`;
}
