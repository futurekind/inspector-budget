import numeral from 'numeral';
import 'numeral/locales/de';

numeral.defaultFormat('0,0.00')
numeral.locale('de');

export { numeral };