import React from 'react';
import styled, { withTheme } from 'styled-components';
import { Image, Markdown, Box, Paragraph, Grid } from 'grommet';
import RoutedAnchor from './RoutedAnchor';
import Example from './Example';
import VerticalCard from './VerticalCard';
import TemplatesGroup from './TemplatesGroup';
import TemplateCard from './TemplateCard';
import FlexBox from './FlexBox';

const MarkdownImage = styled(Image)`
  max-width: 100%;
`;


const GithubImage = ({ src, ...rest }) => {
  let rawSrc = src;
  if (rawSrc.includes('https://github.com')) {
    rawSrc = rawSrc.replace('https://github.com', 'https://raw.githubusercontent.com').replace('/blob', '');
  }
  return (
    <MarkdownImage src={rawSrc} {...rest} />
  );
};

const LargeParagraph = styled(Paragraph)`
  max-width: 632px;
`;


const Code = styled(Box)`
  font-family: monospace; 
`;

export default withTheme(({ theme, ...rest }) => (
  <Markdown
    components={{
      p: { component: LargeParagraph },
      img: { component: GithubImage },
      a: { component: RoutedAnchor },
      code: { component: Code, props: { background: theme.dark ? 'dark-1' : 'light-2' } },
      example: { component: Example },
      grid: { component: Grid },
      card: { component: VerticalCard },
      templates: { component: TemplatesGroup, props: { templates: rest.templates } },
      template: { component: TemplateCard },
      flexbox: { component: FlexBox },
    }}
    {...rest}
  />
));
