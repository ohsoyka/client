import PropTypes from 'prop-types';
import AuthenticatablePage from './_authenticatable';

class ProtectedPage extends AuthenticatablePage {
  static async getInitialProps({ req, res }) {
    const parentProps = await super.getInitialProps({ req });

    if (!parentProps.isAuthenticated) {
      res.redirect('/');

      return { ...parentProps, error: { status: 401 } };
    }

    return { ...parentProps };
  }
}

ProtectedPage.contextTypes = {
  isAuthenticated: PropTypes.bool,
};

export default ProtectedPage;
