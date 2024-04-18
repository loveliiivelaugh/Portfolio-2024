import React from 'react';
import { Card, CardContent, Typography, Grid, Link, Avatar } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { queries } from '../api';

const ExtraResultContent = (props) => {
    // const webpageContentQuery = useQuery(queries.readFromServer2({ endpoint: `llms/puppeteer?url=${props?.url}` }))
    // console.log({ webpageContentQuery })

    return (
        <>
            <Typography variant="body1" gutterBottom>{props?.url}</Typography>
            <Typography variant="body1" gutterBottom>{props?.description}</Typography>
            <Typography variant="body1" gutterBottom>{props?.author}</Typography>
        </>
    )
}

const classes = {
  card: {
    marginBottom: "16px",
    boxShadow: '0 1px 6px rgba(32, 33, 36, 0.28)',
    '&:hover': {
      boxShadow: '0 2px 12px rgba(32, 33, 36, 0.28)',
    },
  },
  image: {
    width: 100,
    height: 'auto',
    marginRight: "16px",
  },
  avatar: {
    backgroundColor: "red",
    width: "48px",
    height: "48px",
  },
};

const SearchResultList = ({ results }) => {
  return (
    <div>
      {results.map((result, index) => (
        <Card key={index} className={classes.card}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Typography variant="h6">
                  <Link href={result.url} target="_blank" rel="noopener noreferrer" color="inherit">{result.title}</Link>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" gutterBottom>{result.description}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" color="textSecondary">{result.url}</Typography>
                <ExtraResultContent {...result} />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Avatar alt={result.profile.name} src={result.profile.img} className={classes.avatar} />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" component="span">{result.profile.name}</Typography>
                    <Typography variant="caption" color="textSecondary" component="span">&nbsp;-&nbsp;{result.page_age}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SearchResultList;
