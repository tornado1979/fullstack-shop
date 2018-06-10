import React from 'react'
import propTypes from 'prop-types'
import classnames from 'classnames'

import './block.scss'

export const Block = ({
  bgTemplate,
  hasImage = false,
  hasMessage,
  hasTitle,
  isCopywrite,
  isImageWidthAuto,
  isMenu = false,
  isMonoblock,
  isReverse,
  source,
  text,
  title,
}) => {
  const blockClass = classnames({
    'block-wrapper': true,
    copywrite: isCopywrite,
    'direction-reverse': isReverse,
    'image-auto-width': isImageWidthAuto,
    menu: isMenu,
    monoblock: isMonoblock,
    [`bg--${bgTemplate}`]: bgTemplate,
  })
  const colTextClass = classnames({
    'col-text': true,
  })

  return (
    <div className={blockClass} >
      {hasTitle && <div className="col-title">{title}</div>}
      {hasImage &&
        <div className="col-img">
          <img alt="" src={source} />
        </div>}
      {hasMessage &&
        <div className={colTextClass}>
          {text}
        </div>}
    </div>
  )
}

Block.defaultProps = {
  bgTemplate: 'template1',
  hasImage: false,
  hasMessage: false,
  hasTitle: false,
  isCopywrite: false,
  isImageWidthAuto: false,
  isMenu: false,
  isMonoblock: false,
  isReverse: false,
  source: null,
  text: 'Default text',
  title: 'Default title',
}

Block.propTypes = {
  bgTemplate: propTypes.string,
  hasImage: propTypes.bool,
  hasMessage: propTypes.bool,
  hasTitle: propTypes.bool,
  isCopywrite: propTypes.bool,
  isImageWidthAuto: propTypes.bool,
  isMenu: propTypes.bool,
  isMonoblock: propTypes.bool,
  isReverse: propTypes.bool,
  source: propTypes.string,
  text: propTypes.oneOfType([
    propTypes.string,
    propTypes.array,
  ]),
  title: propTypes.string,
}
