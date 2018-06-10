import React from 'react'
import propTypes from 'prop-types'
import classnames from 'classnames'

import './footer.scss'
import { MainBlock } from '../mainBlock'
import { Block } from '../block'

import {
  copywrite,
  footerData,
  socialData,
} from '../../data/footerData'

export const Footer = ({ bgTemplate }) => {
  const footerClass = classnames({
    [`bg--${bgTemplate}`]: true,
  })

  // read footerData and upt them on an array
  const lista = Object.keys(footerData)
    .map(key => {
      return footerData[key].items.map(listItem => {
        if (footerData[key].type !== 'image') {
          return <a href="/" key={listItem}>{listItem}</a>
        }

        return {
          img: listItem,
          type: 'image',
        }
      })
    })
  // create lists & images blocks
  const innerBlocks = lista.map((items, index) => {
    if (items[0].type && items[0].type === 'image') {
      return (<Block
        hasImage
        hasMessage={false}
        hasTitle={false}
        key={index + 10}
        source={items[0].img}
        text=""
        title=""
      />)
    }
    return (<Block
      hasImage={false}
      hasMessage
      hasTitle={false}
      isMenu // menu gets .menu class
      key={index + 10}
      text={items}
      title=""
    />)
  })

  // read social data
  const socialList = Object.keys(socialData)
    .map(key => {
      return socialData[key].items.map(listItem => {
        if (socialData[key].type !== 'image') {
          return <div key={listItem}>{listItem}</div>
        }
        return {
          img: listItem,
          type: 'image',
        }
      })
    })
  // create social  blocks
  const socialBlocks = socialList.map((items, index) => {
    if (items[0].type && items[0].type === 'image') {
      return (<Block
        hasImage
        hasMessage={false}
        hasTitle={false}
        key={index + 10}
        source={items[0].img}
        text=""
        title=""
      />)
    }
    return (<Block
      hasImage
      hasMessage
      hasTitle={false}
      key={index + 10}
      text={items}
      title=""
    />)
  })

  const copywriteBlock = (<Block
    hasImage={false}
    hasMessage
    hasTitle={false}
    isCopywrite
    key="123"
    text={copywrite}
    title="" // gets special className
  />)

  return (
    <footer className={footerClass}>
      <MainBlock
        bgTemplate="template2"
        hasImg={false}
        hasMessage
        hasTitle
        isMonoblock={false}
        isReverse={false} // '1.image & 2.text' or '1.text & 2.image'
        text="Neque porro quisquam est qui dolorem ipsum quia
          dolor sit amet, consectetur, adipisci velit..."
        title="Main Title"
      >
        {/* blocks 4 footer blocks 1st line */}
        {innerBlocks}
        {/* social blocks & copywrite 2nd line */}
        {socialBlocks}
        {copywriteBlock}
      </MainBlock>
    </footer>
  )
}

Footer.propTypes = {
  bgTemplate: propTypes.string.isRequired,
}
