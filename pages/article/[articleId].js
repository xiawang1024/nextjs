export default function Article({ data }) {
    return (<div className='article'>

        <h1>{data && data.articleTitle}</h1>

        <div dangerouslySetInnerHTML={{ __html: data && data.contentBody }}></div>
        {/* <style jsx>{`
            .article{
                line-height:2;
            }
            h1{
                text-align:center;
                font-size:24px;
                font-weight:bold;
                color:#333333;
            }
            img{
                width:100px !important;
            }
        `}
        </style> */}
    </div>)
}



// export async function getServerSideProps({ params }) {
//     const res = await fetch(`https://pubmob.dianzhenkeji.com/cms/articlewithrelated?articleId=${params.articleId}&tenantId=DXNews`)
//     const { result } = await res.json()

//     return {
//         props: { data: result }
//     }
// }
export async function getStaticProps({ params }) {
    const res = await fetch(`https://pubmob.dianzhenkeji.com/cms/articlewithrelated?articleId=${params.articleId}&tenantId=hnr`)
    const { result } = await res.json()

    return {
        unstable_revalidate: 30,
        props: { data: result }
    }
}

export async function getStaticPaths() {
    const res = await fetch('https://pubmob.dianzhenkeji.com/cms/articles?tenantId=hnr&channelId=1188657936537358336&pageNo=1&pageSize=10')
    const { result } = await res.json()


    const paths = result.content.map(item => {
        return {
            params: {
                articleId: item.id
            }
        }
    })

    return { paths, fallback: true }
}