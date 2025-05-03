import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Entry } from 'types';
import style from './entry.module.css';
import { snackBarMessagePublished, snackbarVisibillityChanged } from 'store/reducer';
import { selectAllFiles, selectFileFilter } from 'store/selector/entrys';
import { DisplayIf } from 'comonents/DisplayIf';
import copy from 'copy-to-clipboard';
import Grid from '@material-ui/core/Grid';

interface EntryComponentProps {
    entry: Entry;
}

export const EntryComponent = ({ entry }: EntryComponentProps) => {
    const dispatch = useDispatch();
    const fileFilter = useSelector(selectFileFilter);
    const files = useSelector(selectAllFiles);
    const shouldDisplayFile = fileFilter.length === 0 && files.length > 1;
    const onClick = useCallback(() => {
        const success = copy(entry.url);
        dispatch(snackbarVisibillityChanged(false));
        setTimeout(() => {
            dispatch(
                snackBarMessagePublished({
                    message: success ? `Link Copied - ${entry.name}` : 'Failed to copy link',
                    severity: success ? 'success' : 'error',
                }),
            );
        }, 0);
    }, [entry, dispatch]);
    return (
        <Grid container spacing={1}>
            <Card variant="outlined" className={style.container} onClick={onClick}>
                <Box display="flex" flexDirection="row" alignItems="stretch">
                    {/* Image Section - 1/3 of card */}
                    <Box flex="1" maxWidth="33.33%" style={{ backgroundColor: '#616161'}}>
                        <CardMedia>
                            <div className={style.imageContainer}>
                                <img
                                    src={entry.logo}
                                    className={style.image}
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    alt={entry.name}
                                />
                            </div>
                        </CardMedia>
                    </Box>

                    {/* Content Section - 2/3 of card */}
                    <Box flex="2">
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="h6">{entry.name}</Typography>
                                <Typography>{entry.groupName}</Typography>

                                <DisplayIf expr={shouldDisplayFile}>
                                    <Typography variant="caption">{entry.fileName}</Typography>
                                </DisplayIf>
                            </CardContent>
                        </CardActionArea>
                    </Box>
                </Box>
            </Card>
        </Grid>
    );
};
