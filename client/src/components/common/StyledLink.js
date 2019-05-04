import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { palette } from '../../styles/styles'

const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${props => props.selected ? `${palette.primaryColor}` : `${palette.text}`};

    -webkit-transition: color 0.2s; /* Safari */
    transition: color 0.2s;
    transition-timing-function: ease-out;

    &:focus, &:visited, &:link, &:active {
        text-decoration: none;
    }

    &:hover {
        color: ${palette.primaryColor};
    }
`

export default (props) => <StyledLink {...props} />
