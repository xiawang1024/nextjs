import Link from 'next/link'
import { useState } from 'react'
import useSWR from 'swr'
const URL = 'https://pubmob.dianzhenkeji.com/cms/articles?tenantId=hnr&channelId=1188657936537358336&pageNo=1&pageSize=10'

const fetcher = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data.message)
    }
    return data.result.content
}

export default function Articles(props) {
    const [count, setCount] = useState(0)
    function handClick() {
        setCount(count + 1)
    }

    const { data, error } = useSWR(URL, fetcher, { initialData: props.data })

    return (
        <div>
            <ul>
                {
                    data.map(item => <li key={item.id}><Link href="/article/[articleId]" as={`/article/${item.id}`}><a>{item.contentTitle}</a></Link></li>)
                }
                <style jsx>{`
                li{
                    line-height:2;
                }
            `}</style>
            </ul>

            <button onClick={handClick}>点击{count}</button>
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
    const res = await fetch('https://pubmob.dianzhenkeji.com/cms/articles?tenantId=hnr&channelId=1188657936537358336&pageNo=1&pageSize=10')
    const { result } = await res.json()
    return {
        props: {
            data: result.content
        },
        unstable_revalidate: 30,
    }
}

