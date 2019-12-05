import * as React from 'react'; 
import {Grid} from '@material-ui/core'

import * as S from './CourseList.styled' 

export default () => {
    
    return (
        <S.Container>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <S.Paper> xs=3 </S.Paper>
                </Grid>
                <Grid item xs={3}>
                    <S.Paper> xs=3 </S.Paper>
                </Grid>
                <Grid item xs={3}>
                    <S.Paper > xs=3 </S.Paper>
                </Grid>
                <Grid item xs={3}>
                    <S.Paper > xs=3 </S.Paper>
                </Grid>
                <Grid item xs={3}>
                    <S.Paper > xs=3 </S.Paper>
                </Grid>
            </Grid>
    </S.Container>)
};
