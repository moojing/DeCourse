import * as React from 'react';
import * as S from './Loading.styled'

let Loading = ({loading}) => {
    console.log('loading: ', loading);

    return (
        <S.Loading loading={loading.toString()}/>
    )
}

export default Loading; 