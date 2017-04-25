import Document, { Head, Main, NextScript } from 'next/document'
import styleSheet from 'styled-components/lib/models/StyleSheet'
import styled from 'styled-components'

const DefaultStyles = styled.div`
    font-size: 16px;
`

export default class MyDocument extends Document {
    static async getInitialProps ({renderPage}) {
        const page = renderPage()
        const styles = <style dangerouslySetInnerHTML={{
            __html: styleSheet.rules().map(rule => rule.cssText).join('\n')
        }}/>
        return {...page, styles}
    }

    render () {
        return (
            <html>
                <Head>
                    <title>Kijani</title>
                    <link rel="shortcut icon" href="/static/favicon.png"/>
                </Head>
                <body>
                    <DefaultStyles>
                        <Main />
                        <NextScript />
                    </DefaultStyles>
                </body>
            </html>
        )
    }
}
