import { Box, Heading, WorldMap } from 'grommet';
import Page from '../../components/Page';

const continents = [
  {
    name: 'Africa',
    color: 'accent-1',
    code: 'AF',
  },
  {
    name: 'Australia',
    color: 'accent-2',
    code: 'OC',
  },
  {
    name: 'Asia',
    color: 'neutral-1',
    code: 'AS',
  },
  {
    name: 'Europe',
    color: 'neutral-2',
    code: 'EU',
  },
  {
    name: 'North America',
    color: 'neutral-3',
    code: 'NA',
  },
  {
    name: 'South America',
    color: 'status-warning',
    code: 'SA',
  },
];

export default class Home extends React.Component {
  state = {
    worldContinent: undefined,
    worldExchanges: undefined,
  };
  static defaultProps = {
    exchanges: [],
    countries: [],
  };

  exchangesByName(name) {
    const { exchanges: allExchanges, countries } = this.props;
    const continent = continents.find(c => (c.name === name));
    const exchanges = Object.keys(allExchanges).map(key => allExchanges[key]);
    const continentExchanges = [];
    countries.filter(c => (c.continent === continent.code))
      .forEach((c) => {
        exchanges.filter(e => e.countries.findIndex(ec => (ec === c.code)) !== -1).forEach((e) => {
          if (continentExchanges.findIndex(ex => ex.id === e.id) === -1) {
            continentExchanges.push(e);
          }
        });
      });
    return { continentExchanges, continent };
  }

  onContinentClick = (name) => {
    const exchanges = this.exchangesByName(name);
    exchanges.continentExchanges.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (b.name > a.name) {
        return -1;
      }
      return 0;
    });
    this.setState(exchanges);
  };

  onContinentHover = (hover, name) => {
    if (hover) {
      const exchanges = this.exchangesByName(name);
      this.setState({ worldContinent: name, worldExchanges: exchanges.continentExchanges.length });
    } else {
      this.setState({ worldContinent: undefined });
    }
  };

  render() {
    const { worldContinent, worldExchanges } = this.state;
    const { responsive } = this.props;
    let layer;
    const continentHover = worldContinent ? (
      `${worldExchanges} exchanges in ${worldContinent}, click to see more...`
    ) : null;
    return (
      <Page title='crypto-grommet'>
        <Box align='center' style={{ height: responsive ? '430px' : undefined }}>
          <Heading level={1}>
            <strong>Exchanges by continent</strong>
          </Heading>
          <Box direction='row'>
            <WorldMap
              style={{ width: 'auto' }}
              continents={continents.map(c => (
                {
                  ...c,
                  onClick: this.onContinentClick,
                  onHover: hover => this.onContinentHover(hover, c.name),
                }))}
              selectColor='accent-2'
            />

          </Box>
          <Box align='end' basis='xsmall'>
            {continentHover}
          </Box>
          {layer}
        </Box>
        <Box pad='small' align='center' border='top'>
          <Heading level={1}>
            <strong>Prices</strong>
          </Heading>
        </Box>
      </Page>
    );
  }
}
