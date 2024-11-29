import options from './options';

const { _ } = options;

if (_.includes('locale')) {
  await import('./locale');
}
