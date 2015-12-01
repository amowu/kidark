export default function mapStateToProps (state) {
  return {
    ...state,
    messages: state.$$intl.messages[state.$$intl.selectedLanguage]
  }
}
