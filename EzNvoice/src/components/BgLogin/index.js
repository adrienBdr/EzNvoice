import * as React from 'react';
import Svg, {
  Defs,
  Pattern,
  Image,
  G,
  Path,
  Circle,
  Text,
  TSpan,
} from 'react-native-svg';
import { TEXT_LOGIN_TITLE, TEXT_WELCOME } from '../../consts/strings/fr';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function BgLogin(props) {
  const { style } = props;

  return (
    <Svg width={472.515} height={896} viewBox="0 0 472.515 896" style={style}>
      <Defs>
        <Pattern
          id="prefix__b"
          preserveAspectRatio="xMidYMid slice"
          width="100%"
          height="100%"
          viewBox="0 0 388 394"
        >
          <Image
            width={388}
            height={394}
            xlinkHref="data:image/png;base64,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"
          />
        </Pattern>
      </Defs>
      <G fill="#25a18e">
        <Path
          data-name="Trac\xE9 3"
          d="M195.93 896H414V667.782S189.059 802.4 183.711 806.7s-10.3 9.443-13.4 20.239-2.13 20.012 0 25.88S195.93 896 195.93 896z"
        />
        <Path
          data-name="Trac\xE9 2"
          d="M.497 423.226L-.003-.001h127.17L261.79 200.057s7.926 16.29 6.377 31.037-12.577 27.952-12.577 27.952z"
        />
      </G>
      <G filter="url(#prefix__a)">
        <G
          data-name="EzNvoiceLogo"
          transform="translate(177.02 161.99)"
          stroke="#f3f3f3"
          fill="url(#prefix__b)"
        >
          <Circle cx={73.5} cy={73.5} r={73.5} stroke="none" />
          <Circle cx={73.5} cy={73.5} r={73} fill="none" />
        </G>
      </G>
      <G fill="#fff" fontFamily="Roboto-Regular, Roboto">
        <Text
          data-name="Bienvenue"
          transform="translate(105.497 154.993)"
          fontSize={39}
        >
          <TSpan x={-93.406} y={0}>
            {TEXT_WELCOME}
          </TSpan>
        </Text>
        <Text transform="translate(90.497 243.993)" fontSize={51}>
          <TSpan x={-62.829} y={0}>
            {TEXT_LOGIN_TITLE}
          </TSpan>
        </Text>
      </G>
    </Svg>
  );
}

export default BgLogin;
