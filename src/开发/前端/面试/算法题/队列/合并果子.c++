#include <iostream>
#include <queue>
using namespace std;

queue<long long> q1, q2;
const int MAXN = 10000001;  // 10^7 + 1
int *cnt;  // 动态分配内存，避免栈溢出

inline long long getFirst()
{
    if (q2.empty() || (!q1.empty() && q1.front() < q2.front()))
    {
        long long t = q1.front();
        q1.pop();
        return t;
    }
    else
    {
        long long t = q2.front();
        q2.pop();
        return t;
    }
}

int main()
{
    ios::sync_with_stdio(false); // 优化输入输出
    cin.tie(nullptr);

    int n;
    long long t, sum = 0;
    cin >> n;

    // 动态分配内存
    cnt = new int[MAXN]();  // 初始化为0

    // 使用桶计数
    for (int i = 0; i < n; i++)
    {
        cin >> t;
        cnt[t]++;  // 统计每个数出现的次数
    }

    // 按顺序将数据放入第一个队列
    for (int i = 1; i < MAXN; i++)
    {
        while (cnt[i] > 0)
        {
            q1.push(i);
            cnt[i]--;
        }
    }

    // 释放内存
    delete[] cnt;

    // 合并过程
    for (int i = 0; i < n - 1; i++)
    {
        long long a = getFirst();
        long long b = getFirst();
        sum += a + b;
        q2.push(a + b);  // 新合并的果子放入第二个队列
    }

    cout << sum;
    return 0;
}