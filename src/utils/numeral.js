import numeral from 'numeral';
import de from 'numeral/locales/de';

numeral.defaultFormat('0,0.00')
numeral.locale('de');

export { numeral };