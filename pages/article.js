import Link from 'next/link'
import useSWR from 'swr'
const URL = 'https://pubmob.dianzhenkeji.com/cms/articles?tenantId=DXNews&channelId=1161446515919687680&pageNo=1&pageSize=20'
// const URL = 'http://localhost:8080/api'

const fetcher = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data.message)
    }
    return data.result.content
}

export default function Articles(props) {


    const { data, error } = useSWR(URL, fetcher, { initialData: props.data })

    return (
        <div>
            <ul>
                {
                    data.map((item, idx) => {
                        if (item.articleShowStyle === '1') {
                            return <li key={item.id}><Link href="/article/[articleId]" as={`/article/${item.id}`}><a>{idx + 1}. <img className='cover' src={item.coverImagesList[0].url} /> {item.contentTitle}</a></Link></li>
                        }

                    })
                }
                <style jsx>{`
                ul{
                    padding:0;
                }
                li{
                    margin-bottom:20px;
                    line-height:1.5;
                    list-style:none;
                }
                .cover{
                    margin:0 4px;
                }
                a{
                    display:flex;

                }
            `}</style>
            </ul>

        </div>

    )
}

/**
 * ssr
 */
// export async function getServerSideProps() {
//     const res = await fetch('https://pubmob.dianzhenkeji.com/cms/articles?tenantId=hnr&channelId=1188657936537358336&pageNo=1&pageSize=10')
//     const { result } = await res.json()
//     return {
//         props: {
//             data: result.content
//         }
//     }
// }

/**
 * ssg
 */
export async function getStaticProps() {
    const res = await fetch(URL)
    const { result } = await res.json()
    return {
        props: {
            data: result.content
        },
        unstable_revalidate: 30,
    }
}

