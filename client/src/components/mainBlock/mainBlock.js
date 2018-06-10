import React, { Fragment } from 'react'
import propTypes from 'prop-types'
import classnames from 'classnames'

import '../block/block.scss'
import { Block } from '../block'

import imgLoremIpsum3 from '../../assets/img/Lorem-Ipsum3.jpg'

export const MainBlock = ({
  bgTemplate,
  children,
  hasImage,
  hasMessage,
  hasTitle,
  isMonoblock,
  isReverse,
  source,
  text,
  title,
}) => {
  const blockClass = classnames({
    'direction-reverse': isReverse,
    monoblock: isMonoblock,
    [`bg--${bgTemplate}`]: bgTemplate,
  })

  return (
    <div className={`main-block ${blockClass}`} >
      {hasTitle && <div className="col-title">{title}</div>}
      {hasImage &&
        <div className="col-img">
          <img alt="" src={source} />
        </div>}
      {hasMessage &&
        <div className="col-text">
          {text}
        </div>}
      {/* 4 blocks : lists & payments img */}
      {/* and social blocks */}
      {children &&
        <Fragment>
          <div className="horizontalBlock with-subblocks">
            {children[0]}
          </div>
          <div className="horizontalBlock with-subblocks social">
            <div className="social-wrapper">
              {children[1]}
              {children[2]}
            </div>
          </div>
        </Fragment>}
      {/* A. 6 small blocks on two lines space-around */}
      {!children &&
        <div className="horizontalBlock with-subblocks">
          <Block
            hasImage
            hasTitle
            source={imgLoremIpsum3} // image source
            title="Title"
          />
          <Block
            hasImage
            hasTitle
            source={imgLoremIpsum3} // image source
            title="Title"
          />
          <Block
            hasImage
            hasTitle
            source={imgLoremIpsum3} // image source
            title="Title"
          />
          <Block
            hasImage
            hasTitle
            source={imgLoremIpsum3} // image source
            title="Title"
          />
          <Block
            hasImage
            hasTitle
            source={imgLoremIpsum3} // image source
            title="Title"
          />
          <Block
            hasImage
            hasMessage={false}
            hasTitle={false}
            source={imgLoremIpsum3}
            text="" // image source
            title="Title"
          />
        </div>}
    </div>
  )
}

MainBlock.defaultProps = {
  bgTemplate: 'template2',
  children: null,
  hasImage: false,
  hasMessage: false,
  hasTitle: false,
  isMonoblock: false,
  isReverse: false,
  source: imgLoremIpsum3,
  text: 'Default text',
  title: 'Default title',
}

MainBlock.propTypes = {
  bgTemplate: propTypes.string,
  children: propTypes.instanceOf(Array),
  hasImage: propTypes.bool,
  hasMessage: propTypes.bool,
  hasTitle: propTypes.bool,
  isMonoblock: propTypes.bool,
  isReverse: propTypes.bool,
  source: propTypes.string,
  text: propTypes.string,
  title: propTypes.string,
}
